// Add TypeScript type definitions for Node.js modules
declare module 'crypto-browserify';
declare module 'stream-browserify';
declare module 'stream-http';
declare module 'https-browserify';
declare module 'os-browserify/browser';

// Add global window.ethereum type
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      isStatus?: boolean;
      isTrust?: boolean;
      isCoinbaseWallet?: boolean;
      isCoinbaseBrowser?: boolean;
      isTokenPocket?: boolean;
      isTokenary?: boolean;
      isRabby?: boolean;
      isRabbyWallet?: boolean;
      isImToken?: boolean;
      isMathWallet?: boolean;
      isTally?: boolean;
      isTallyWallet?: boolean;
      isTokenPocket?: boolean;
      isTrust?: boolean;
      isTrustWallet?: boolean;
      isFrame?: boolean;
      isFrameNative?: boolean;
      isBraveWallet?: boolean;
      isExodus?: boolean;
      isOpera?: boolean;
      isAvalanche?: boolean;
      isBitKeep?: boolean;
      isBlockWallet?: boolean;
      isBraveWallet?: boolean;
      isCoin98?: boolean;
      isExodus?: boolean;
      isFrame?: boolean;
      isMathWallet?: boolean;
      isOkxWallet?: boolean;
      isOneInchAndroidWallet?: boolean;
      isOneInchIosWallet?: boolean;
      isOpera?: boolean;
      isPhantom?: boolean;
      isSafePal?: boolean;
      isTally?: boolean;
      isTokenPocket?: boolean;
      isTokenary?: boolean;
      isTrust?: boolean;
      isTrustWallet?: boolean;
      isXDEFI?: boolean;
      isZerion?: boolean;
      isZerionWallet?: boolean;
      isZerionBrowser?: boolean;
      isZerionExtension?: boolean;
      isZerionMobile?: boolean;
      isZerionWeb?: boolean;
      isZerionWeb3?: boolean;
      isZerionWeb3Browser?: boolean;
      isZerionWeb3Extension?: boolean;
      isZerionWeb3Mobile?: boolean;
      isZerionWeb3Web?: boolean;
      isZerionWeb3WebExtension?: boolean;
      isZerionWeb3WebMobile?: boolean;
      isZerionWeb3WebWeb?: boolean;
      request: (request: { method: string; params?: Array<any> }) => Promise<any>;
      on?: (method: string, callback: (...args: any[]) => void) => void;
      removeListener?: (method: string, callback: (...args: any[]) => void) => void;
      autoRefreshOnNetworkChange?: boolean;
      chainId?: string;
      networkVersion?: string;
      selectedAddress?: string;
      enable?: () => Promise<string[]>;
      _metamask?: {
        isUnlocked: () => Promise<boolean>;
        isConnected: () => boolean;
        requestBatch: (requests: Array<{ method: string; params?: Array<any> }>) => Promise<any[]>;
      };
    };
  }
}

export {};
