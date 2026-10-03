// Set UMAMI_DOMAIN to your own Umami instance to enable analytics. There is
// deliberately no default: the template originally fell back to the author's
// hosted instance, which would have reported your visitors' data to him.
export const UMAMI_SRC = process.env.UMAMI_DOMAIN ?? "";
