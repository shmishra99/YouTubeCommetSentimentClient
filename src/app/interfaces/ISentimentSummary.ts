export interface SentimentSummary {
    [key: string]: { color: string; value: number };
    negative_count: { color: string; value: number };
    neutral_count: { color: string; value: number };
    positive_count: { color: string; value: number };
    undetermined_count: { color: string; value: number };
}