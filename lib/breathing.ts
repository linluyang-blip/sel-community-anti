// 呼吸放鬆計時器的節奏設定。放在 lib 而非 client component，伺服器端頁面才能讀取說明文字。

export type Kind = "in" | "hold-in" | "out" | "hold-out";
export type Phase = { kind: Kind; seconds: number };
export type Pattern = { id: string; name: string; rhythm: string; note: string; phases: Phase[] };

export const patterns: Pattern[] = [
  {
    id: "balance",
    name: "平衡呼吸",
    rhythm: "吸 5・吐 5",
    note: "每分鐘約 6 次呼吸，最容易上手，適合運動後緩和心跳。",
    phases: [
      { kind: "in", seconds: 5 },
      { kind: "out", seconds: 5 },
    ],
  },
  {
    id: "box",
    name: "方塊呼吸",
    rhythm: "吸 4・停 4・吐 4・停 4",
    note: "四段等長、節奏規律，適合上課或比賽前穩定專注。",
    phases: [
      { kind: "in", seconds: 4 },
      { kind: "hold-in", seconds: 4 },
      { kind: "out", seconds: 4 },
      { kind: "hold-out", seconds: 4 },
    ],
  },
  {
    id: "478",
    name: "4-7-8 呼吸",
    rhythm: "吸 4・停 7・吐 8",
    note: "吐氣特別長，有助於放鬆，適合感到緊張或睡前使用。",
    phases: [
      { kind: "in", seconds: 4 },
      { kind: "hold-in", seconds: 7 },
      { kind: "out", seconds: 8 },
    ],
  },
];
