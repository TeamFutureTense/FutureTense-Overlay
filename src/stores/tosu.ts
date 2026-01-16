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

    const rankCurrent = computed(() => {
        const value = raw.value?.play?.rank?.current;
        return value !== undefined ? value : "D";
    });
    const rankResult = computed(() => {
        const value = raw.value?.resultsScreen?.rank;
        return value !== undefined ? value : "D";
    });
    const currentScore = computed(() => {
        const value = raw.value?.play?.score;
        return value !== undefined ? value : 0;
    });
    const currentAcc = computed(() => {
        const value = raw.value?.play?.accuracy;
        return value !== undefined ? value : 0;
    });

    const currentPP = computed(() => {
        const value = raw.value?.play?.pp?.current;
        return value !== undefined ? value : 0;
    });
    const fcPP = computed(() => {
        const value = raw.value?.play?.pp?.fc;
        return value !== undefined ? value : 0;
    });

    const beatmapTitle = computed(() => {
        const value = raw.value?.beatmap?.title;
        return value !== undefined ? value : ""
    })
    const beatmapArtist = computed(() => {
        const value = raw.value?.beatmap?.artist;
        return value !== undefined ? value : ""
    })
    const beatmapMapper = computed(() => {
        const value = raw.value?.beatmap?.mapper;
        return value !== undefined ? value : ""
    })
    const beatmapDiff = computed(() => {
        const value = raw.value?.beatmap?.stats?.stars?.total;
        return value !== undefined ? value : 0
    })
    const beatmapDiffName = computed(() => {
        const value = raw.value?.beatmap?.version;
        return value !== undefined ? value : ""
    })
    const beatmapStatus = computed(() => {
        const value = raw.value?.beatmap?.status?.name;
        return value !== undefined ? value : "unknown";
    })
    const beatmapDuration = computed(() => {
        const value = raw.value?.beatmap?.time?.mp3Length;
        return value !== undefined ? value : 0;
    })
    const beatmapCurrDuration = computed(() => {
        const value = raw.value?.beatmap?.time?.live;
        return value !== undefined ? value : 0;
    })
    const beatmapBg = computed(() => {
        const folder = raw.value?.folders?.beatmap;
        const file = raw.value?.files?.background;
        
        if (!folder || !file) return "";
        
        const fullPath = encodeURIComponent(`${folder}/${file}`);
        return `http://127.0.0.1:24050/Songs/${fullPath}`;
    })


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
        isBreak,
        rankCurrent,
        rankResult,
        currentScore,
        currentAcc,
        currentPP,
        fcPP,
        beatmapStatus,
        beatmapTitle,
        beatmapArtist,
        beatmapMapper,
        beatmapDiff,
        beatmapDiffName,
        beatmapDuration,
        beatmapCurrDuration,
        beatmapBg
    };
});
