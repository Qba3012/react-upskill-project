import React from 'react';
import { Card, CardContent, Grid } from '@material-ui/core';

const Article = ({title, snippet}) => {
    return (
        <Grid container item xs={12} md={12}>
            <Card variant="outlined">
                <Grid item xs={8} md={8}>
                    <CardContent>
                        <h1>{title}</h1>
                        <div>{snippet}</div>
                    </CardContent>
                </Grid>
            </Card>
        </Grid>
    );
};

Article.propTypes = {};

export default Article;
