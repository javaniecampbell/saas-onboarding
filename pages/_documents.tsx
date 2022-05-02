import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }
    render() {
        return (
            <Html lang="en" className="h-full bg-gray-50">
                <Head>
                    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
                </Head>
                <body className="h-full font-sans">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument