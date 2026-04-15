export type TradeSide = 'buy' | 'sell';                                                                                                                                                                             export interface Trade {                                                                                    id: string;
       side: TradeSide;
       symbol: string;
       volume: number;
       entryPrice: number;                                                                                       exitPrice: number;                                                                                        profit: number;                                                                                           dateTime: string;
     }

     export interface GlobalSettings {
       accountName: string;
       baseCurrency: string;
       startingBalance: number;
     }

     export interface AppState {
       settings: GlobalSettings;
       trades: Trade[];
       theme: 'light' | 'dark';
     }
