import { defineStore } from "pinia";
import { shallowRef, ref, computed } from "vue";
import WebSocketManager from "@/script/socket.js";

export const useTosuStore = defineStore("tosu", () => {
    const connected = ref(false);
    const lastUpdate = ref(0);

    // Prevent deep ref caused performance issues
    const raw = shallowRef<any>(null);

    // WebSocketManager Instance
    const manager = shallowRef<WebSocketManager | null>(null);

    function ensureCounterPath() {
        (window as any).COUNTER_PATH ??= "/";
    }

    function connect(host = "127.0.0.1:24050", mode: "v1" | "v2" | "precise" = "v2", filters?: any[]) {
        ensureCounterPath();

        // Prevent redundent connections
        if (manager.value) return;

        const m = new (WebSocketManager as any)(host);
        manager.value = m;

        const handler = (data: any) => {
        raw.value = data;
        lastUpdate.value = Date.now();
        connected.value = true;
        };

        // Choose API
        if (mode === "v1") m.api_v1(handler, filters);
        else if (mode === "precise") m.api_v2_precise(handler, filters);
        else m.api_v2(handler, filters);
    }

    function disconnect() {
        manager.value?.close((manager.value as any).host);
        manager.value = null;
        connected.value = false;
    }

    // Exposed keys goes here
    const isInGame = computed(() => raw.value?.state?.name === "play")

    const combo = computed(() => {
        const value = raw.value?.play?.combo?.current;
        return value !== undefined ? value : 0;
    })
    const osu_h300 = computed(() => {
        const value = raw.value?.play?.hits?.["300"];
        return value !== undefined ? value : 0;
    })
    const osu_h100 = computed(() => {
        const value = raw.value?.play?.hits?.["100"];
        return value !== undefined ? value : 0;
    })
    const osu_h50 = computed(() => {
        const value = raw.value?.play?.hits?.["50"];
        return value !== undefined ? value : 0;
    })
    const osu_miss = computed(() => {
        const value = raw.value?.play?.hits?.["0"];
        return value !== undefined ? value : 0;
    })
    const isBreak = computed(() => {
        const value = raw.value?.beatmap?.isBreak;
        return value !== undefined ? value : false;
    });

    return { 
        connected, 
        lastUpdate, 
        raw, 
        connect, 
        disconnect,
        isInGame,
        combo,
        osu_h300,
        osu_h100,
        osu_h50,
        osu_miss,
        isBreak
    };
});
