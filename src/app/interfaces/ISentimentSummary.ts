export interface SentimentSummary {
    [key: string]: { color: string; count: number; percent: number };
    negative: { color: string; count: number; percent: number };
    neutral: { color: string; count: number; percent: number };
    positive: { color: string; count: number; percent: number };
    undetermined: { color: string; count: number; percent: number };
}