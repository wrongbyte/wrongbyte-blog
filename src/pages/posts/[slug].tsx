import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import type { PostModel } from "../../types/Post";
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import postList from '../../lib/getPosts';
import { parsePost } from '../../lib/getPosts';

const Post = (props: PostModel) => {
    return (
        <>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content="my site" />
                <link rel="shortcut icon" href="favicon.ico" />
            </Head>
            <article>
                <h1 className="font-title text-3xl text-center mb-4">{props.title}</h1>
                <MDXRemote {...props.source}/>
            </article>
        </>
    );
}

export const getStaticProps : GetStaticProps = async ({ params }) => {
    let postFilename = params?.slug + '.mdx';
    let post = parsePost(postFilename);

    return {
        props: {
            ...post,
            date: post.date.toDateString(),
            source: await serialize(post.content)
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: postList.map((post) => ({ params: { slug: post.slug } })),
        fallback: false
    }
}

export default Post