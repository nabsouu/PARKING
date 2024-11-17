import { html } from "hono/html";

type Props={
    children: any,
    pageTitle:String
    h1content:string;
}

export const Layout = ( { children, pageTitle, h1content }:Props) => html`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle} | EuroPark</title>
</head>
<body>
    <div class="container">
    <h1>${h1content}</h1>
        ${children}
    </div>
</body>
</html>`