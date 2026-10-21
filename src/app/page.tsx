/**
 * "/" — choose a language. On the Node build the proxy redirects before this page is reached; on the static
 * GitHub Pages build this page does it: a saved choice, then the browser's language, else English. The meta
 * refresh and plain links cover visitors without JavaScript.
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const slash = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true" ? "/" : "";
const href = (l: string) => `${base}/${l}${slash}`;

const pick = `(function(){try{var s=localStorage.getItem("ICH_LOCALE");var l=["en","mr","hi"].indexOf(s)>=0?s:null;
if(!l){var n=(navigator.languages||[navigator.language||""]).map(function(x){return String(x).slice(0,2).toLowerCase()});
for(var i=0;i<n.length;i++){if(n[i]==="mr"||n[i]==="hi"||n[i]==="en"){l=n[i];break}}}
location.replace(${JSON.stringify(base)}+"/"+(l||"en")+${JSON.stringify(slash)});}catch(e){location.replace(${JSON.stringify(href("en"))})}})();`;

export default function RootPage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Ichalkaranji — City Portal</title>
        <meta name="robots" content="noindex" />
        <meta httpEquiv="refresh" content={`2; url=${href("en")}`} />
        <link rel="alternate" hrefLang="en-IN" href={href("en")} />
        <link rel="alternate" hrefLang="mr-IN" href={href("mr")} />
        <link rel="alternate" hrefLang="hi-IN" href={href("hi")} />
        <script dangerouslySetInnerHTML={{ __html: pick }} />
      </head>
      <body style={{ fontFamily: "system-ui, sans-serif", textAlign: "center", padding: "4rem 1rem" }}>
        <p>
          <a href={href("en")}>English</a> · <a href={href("mr")}>मराठी</a> · <a href={href("hi")}>हिंदी</a>
        </p>
      </body>
    </html>
  );
}
