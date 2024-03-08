export interface BackendApiResponse {
    sentiment_summary: {
        negative: { count: number, percent: number }
        neutral: { count: number, percent: number }
        positive: { count: number, percent: number }
        undetermined: { count: number, percent: number }
    }
    top_comments: [string, number][]
    bot_comments: [string, number][]
}