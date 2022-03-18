import React from "react";
import { ArticleJsonLd } from "next-seo";

export type JsonLdPageType = "article" | "blog";

export type JsonLdType = {
  type: JsonLdPageType;
  url: string;
  title: string;
  images: string[];
  datePublished: string;
  dateModified: string;
  authorName: string;
  publisherName: string;
  publisherLogo: string;
  description: string;
};

type Props = Readonly<Readonly<JsonLdType>>;

// @typescript-eslint/no-unused-vars
const JsonLd = (props: Props): JSX.Element => {
  const { type, ...rest } = props;
  return <ArticleJsonLd {...rest} />;
};

export default JsonLd;
