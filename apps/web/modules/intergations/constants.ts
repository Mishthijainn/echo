export const INTERGRATIONS=[
    {
        id:"html",
        title:"HTML",
        icon:"/languages/html5.svg"
    },
    {
        id:"react",
        title:"React",
        icon:"/languages/react.svg"
    }, 
    {
        id:"nextjs",
        title:"Next.js",
        icon:"/languages/nextjssvg"
    },
    {
        id:"javascript",
        title:"JavaScript",
        icon:"/languages/javascript.svg"
    },
]

export type IntegrationId=(typeof INTERGRATIONS)[number]["id"]
export const HTML_SCRIPT='<script data-organization-id="{{ORGANIZATION_ID}}"></script>'
export const REACT_SCRIPT='<script data-organization-id="{{ORGANIZATION_ID}}"></script>'
export const NEXTJS_SCRIPT='<script data-organization-id="{{ORGANIZATION_ID}}"></script>'
export const JAVASCRIPT_SCRIPT='<script data-organization-id="{{ORGANIZATION_ID}}"></script>'