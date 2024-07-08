import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, connectSearchBox, connectHits, Highlight } from 'react-instantsearch-dom';
import { Box, Typography, InputAdornment, TextField, Paper, List, ListItem, Divider, ClickAwayListener } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
);

function Hit({ hit }) {
    return (
        <div style={{ padding: 1, marginBottom: 1 }}>
            <Typography variant="subtitle1">
                <Highlight attribute="title" hit={hit} tagName="mark" />
            </Typography>
            <Typography variant="body2" color="textSecondary" noWrap>
                <Highlight attribute="description" hit={hit} tagName="mark" />
            </Typography>
        </div>
    );
}

const CustomHits = connectHits(({ hits }) => {
    return (
        <Paper elevation={3} style={{ marginTop: '10px', maxHeight: '300px', overflowY: 'auto', position:'fixed', width:'100%'}}>
            <List sx={{ p: 0 }}>
                {hits.slice(0, 3).map(hit => (
                    <ListItem key={hit.objectID} style={{ padding: '10px' }}>
                        <Hit hit={hit} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
});

const CustomSearchBox = connectSearchBox(({ currentRefinement, refine, isSearchStalled }) => {
    const handleChange = (event) => {
        const value = event.target.value;
        refine(value);
    };

    return (
        <ClickAwayListener onClickAway={() => refine('')}>
            <Box sx={{}}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search tasks..."
                    value={currentRefinement}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        style: {
                            borderRadius: '10px',
                            backgroundColor: 'white',
                        },
                    }}
                    size="small"
                />
                {currentRefinement.length > 0 && !isSearchStalled && (
                    <CustomHits />
                )}
            </Box>
        </ClickAwayListener>
    );
});

function AlgoliaSearch() {
    return (
        <InstantSearch searchClient={searchClient} indexName="tasks">
            <CustomSearchBox />
        </InstantSearch>
    );
}

export default AlgoliaSearch;
