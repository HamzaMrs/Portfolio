declare module 'codewonders-helpers';

// View Transitions API (Chrome / Chromium). Typage minimal pour éviter l'erreur TS.
interface ViewTransition {
	ready: Promise<void>;
}

interface Document {
	startViewTransition?: (callback: () => void) => ViewTransition;
}
