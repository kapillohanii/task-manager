import React, { useState } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, connectSearchBox, connectHits, Highlight } from 'react-instantsearch-dom';
import { Box, Typography, InputAdornment, TextField, Paper, List, ListItem, Modal, IconButton, ClickAwayListener } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TaskForm from './TaskForm'; // Import your TaskForm component

const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
);

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80vw',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function Hit({ hit, onTaskSelect }) {
    return (
        <div style={{ padding: 1, marginBottom: 1 }} onClick={() => onTaskSelect(hit)}>
            <Typography variant="subtitle1">
                <Highlight attribute="title" hit={hit} tagName="mark" />
            </Typography>
            <Typography variant="body2" color="textSecondary" noWrap>
                <Highlight attribute="description" hit={hit} tagName="mark" />
            </Typography>
        </div>
    );
}

const CustomHits = connectHits(({ hits, onTaskSelect }) => {
    return (
        <Paper elevation={3} style={{ marginTop: '10px', maxHeight: '300px', overflowY: 'auto', position: 'fixed', width: '100%' }}>
            <List sx={{ p: 0 }}>
                {hits.slice(0, 3).map(hit => (
                    <ListItem key={hit.objectID} style={{ padding: '10px', cursor: 'pointer' }}>
                        <Hit hit={hit} onTaskSelect={onTaskSelect} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
});

const CustomSearchBox = connectSearchBox(({ currentRefinement, refine, isSearchStalled, onTaskSelect }) => {
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
                    <CustomHits onTaskSelect={onTaskSelect} />
                )}
            </Box>
        </ClickAwayListener>
    );
});

function AlgoliaSearch({ users }) {
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTaskSelect = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    return (
        <>
            <InstantSearch searchClient={searchClient} indexName="tasks">
                <CustomSearchBox onTaskSelect={handleTaskSelect} />
            </InstantSearch>
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
                        <IconButton onClick={handleCloseModal}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {selectedTask && (
                        <TaskForm task={selectedTask} users={users} />
                    )}
                </Box>
            </Modal>
        </>
    );
}

export default AlgoliaSearch;