import React from 'react';
import ArticleSearchBar from './ArticleSearchBar';
import Article from './Article';
import { articles } from './resources/Articles';
import { Grid } from '@material-ui/core';

const ArticleSearchContainer = () => (
    <Grid container spacing={2} item xs={6} md={6}>
        <ArticleSearchBar />
        {articles.map((article) => (
            <Article title={article.title} snippet={article.snippet} />
        ))}
    </Grid>
);

ArticleSearchContainer.propTypes = {};

export default ArticleSearchContainer;
