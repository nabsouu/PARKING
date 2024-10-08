import { html } from "hono/html";


type Props = {
  children: any; 
  pageTitle: string;
};

export const Layout = ({ children, pageTitle }: Props) => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${pageTitle}</title>
    </head>
    <body>
    <h1>${pageTitle}</h1>
      ${children}
    </body>
  </html>
`;