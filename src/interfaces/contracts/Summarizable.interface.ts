import { Currency } from "../enums/Currency"

export interface ISummarizable {
	getSummary(walletIds: string[]): Promise<Summarized<string, SummarizedCollection<string>>>
}

export type Summarized<T extends string, K extends SummarizedCollection<string>> = {
	[key in T]: K
}

export type SummarizedCollection<T extends string> = {
	[objectType in T]: {
		[objectId: string]: {
			[currency in typeof Currency as string]: number
		}
	}
}
