import React, { useMemo } from "react";

import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";

import BlogList from "@components/blog/BlogList";
import Meta from "@components/head/Meta";
import HomeAbout from "@components/home/HomeAbout";

import Accent from "@libs/elements/accent/Accent";
import Container from "@libs/elements/container/Container";
import Icon from "@libs/elements/icon/Icon";
import ExternalLink from "@libs/elements/link/ExternalLink";
import Margin from "@libs/elements/margin/Margin";
import { useSortBlog, useMaxBlogUpdatedAt } from "@libs/hooks/blog";
import { BlogType, loadBlogList } from "@libs/modules/blog";
import DefaultTemplate from "@libs/templates/DefaultTemplate";

export const config = { amp: true };

type Props = InferGetStaticPropsType<typeof getStaticProps>;
type StaticProps = {
  blogList: BlogType[];
};

const Page: NextPage<Props> = (props) => {
  const { blogList } = props;

  const sortedBlogList = useSortBlog(blogList);
  const latestBlogList = useMemo(() => {
    return sortedBlogList.slice(0, 3);
  }, [sortedBlogList]);

  const updatedAt = useMaxBlogUpdatedAt(blogList);

  return (
    <>
      <Meta
        type="article"
        title="hbsnow.dev"
        path="/"
        description="hbsnow の技術メモ置き場を兼ねた実験場。"
        createdAt="2017-12-01"
        updatedAt={updatedAt}
      />

      <DefaultTemplate>
        <div className="main">
          <div className="section about">
            <Container>
              <Margin y={6}>
                <HomeAbout>
                  <p>東証プライム市場上場のメガベンチャーで勤務するSREです。</p>
                  <p>
                    このサイトは{" "}
                    <ExternalLink href="https://nextjs.org/">
                      Next.js
                    </ExternalLink>{" "}
                    で SSG され、ソースコードは{" "}
                    <ExternalLink href="https://github.com/">
                      GitHub
                    </ExternalLink>{" "}
                    にて公開されています。
                  </p>
                </HomeAbout>
              </Margin>
            </Container>
          </div>

          <section className="section">
            <Container>
              <Margin y={6}>
                <h2 id="latest-posts">
                  <Accent>Latest Posts</Accent>
                </h2>

                <BlogList blogList={latestBlogList} />

                <Margin y={2}>
                  <div className="allView">
                    <Link href="/blog/">
                      <a className="link">
                        All {blogList.length} Posts <Icon name="arrowRight" />
                      </a>
                    </Link>
                  </div>
                </Margin>
              </Margin>
            </Container>
          </section>
        </div>
      </DefaultTemplate>
      <style jsx>{`
        .section:not(:first-child):not(:last-child) {
          border-bottom: 1px solid var(--color-default-divider);
        }

        .section.about {
          position: relative;
        }
        .section.about::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: var(--color-default-surface);
          transform: skew(0, var(--layout-deg));
          z-index: -1;
        }
        .section.about::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: var(--color-default-bg);
          opacity: 0.6;
          z-index: -1;
        }

        .allView {
          text-align: right;
        }

        .link {
          color: var(--color-primary);
        }
      `}</style>
    </>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const blogList = loadBlogList();

  return {
    props: {
      blogList,
    },
  };
};

export default Page;
