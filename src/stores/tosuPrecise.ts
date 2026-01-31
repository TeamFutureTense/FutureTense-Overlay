import { defineStore } from "pinia";
import { shallowRef, ref, computed } from "vue";
import WebSocketManager from "@/script/socket.js";

export const useTosuPreciseStore = defineStore("tosuPrecise", () => {
    const connected = ref(false);
    const lastUpdate = ref(0);
    const initialized = ref(false);

    const raw = shallowRef<any>({
        currentTime: 0,
        keys: {
            k1: { isPressed: false, count: 0 },
            k2: { isPressed: false, count: 0 },
            m1: { isPressed: false, count: 0 },
            m2: { isPressed: false, count: 0 }
        },
        hitErrors: [],
        tourney: [],
        state: { name: 'menu' },
        play: {
            combo: { current: 0 },
            hits: { "300": 0, "100": 0, "50": 0, "0": 0 },
            score: 0,
            accuracy: 0,
            pp: { current: 0, fc: 0 },
            rank: { current: "D" }
        },
        beatmap: {
            isBreak: false,
            title: "",
            artist: "",
            mapper: "",
            version: "",
            status: { name: "unknown" },
            stats: { stars: { total: 0 } },
            time: { mp3Length: 0, live: 0 }
        },
        resultsScreen: {
            rank: "D"
        },
        folders: { beatmap: "" },
        files: { background: "" }
    });

    // WebSocketManager Instance
    const manager = shallowRef<WebSocketManager | null>(null);

    function ensureCounterPath() {
        (window as any).COUNTER_PATH ??= "/";
    }

    // Merge data
    function mergeDeep(target: any, source: any): any {
        if (!source) return target;
        
        const output = { ...target };
        
        if (isObject(target) && isObject(source)) {
            Object.keys(source).forEach(key => {
                if (isObject(source[key])) {
                    if (!(key in target)) {
                        output[key] = source[key];
                    } else {
                        output[key] = mergeDeep(target[key], source[key]);
                    }
                } else {
                    output[key] = source[key];
                }
            });
        }
        
        return output;
    }

    function isObject(item: any): boolean {
        return item && typeof item === 'object' && !Array.isArray(item);
    }

    function connect(host = "127.0.0.1:24050", filters?: any[]) {
        ensureCounterPath();

        // Prevent redundent connections
        if (manager.value) {
            console.warn("Already connected to Precise API, skipping");
            return;
        }

        const m = new (WebSocketManager as any)(host);
        manager.value = m;

        const handler = (data: any) => {
            // console.log("Precise WebSocket data received:", data);
            
            if (data) {
                // Merge data
                raw.value = mergeDeep(raw.value, data);
                lastUpdate.value = Date.now();
                connected.value = true;
                
                if (!initialized.value) {
                    initialized.value = true;
                    console.log("Precise Store initialized with data");
                }
            }
        };

        // Use Precise API
        m.api_v2_precise(handler, filters);

        console.log(`Connecting to ${host} with Precise mode`);
    }

    function disconnect() {
        manager.value?.close((manager.value as any).host);
        manager.value = null;
        connected.value = false;
        initialized.value = false;
    }

    // Precise API Props
    const currentTime = computed(() => {
        const value = raw.value?.currentTime;
        return value !== undefined ? value : 0;
    });

    const keys = computed(() => {
        return raw.value?.keys || {
            k1: { isPressed: false, count: 0 },
            k2: { isPressed: false, count: 0 },
            m1: { isPressed: false, count: 0 },
            m2: { isPressed: false, count: 0 }
        };
    });

    const hitErrors = computed(() => {
        const value = raw.value?.hitErrors;
        return Array.isArray(value) ? value : [];
    });

    // Tourney 模式数据
    const tourney = computed(() => {
        const value = raw.value?.tourney;
        return Array.isArray(value) ? value : [];
    });

    return { 
        connected,
        initialized, 
        lastUpdate, 
        raw, 
        connect, 
        disconnect,
        // Precise API 特有属性
        currentTime,
        keys,
        hitErrors,
        tourney,
    };
});
