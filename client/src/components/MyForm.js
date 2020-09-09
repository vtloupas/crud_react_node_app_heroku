import React, {useEffect, useState} from 'react';
import {Container} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CustomTable from './CustomTable'
import AddGameForm from "./CustomAddForm";
import EditGameForm from "./CustomEditForm";
import {deleteGameApi, getGamesApi, putGameApi, updateGameApi} from "./QueriesFunctions";
import ErrorMessage from "./ErrorMessage";

export default function MyForm() {
    // useState για την φόρμα
    const initialGameState = {
        id: null,
        title: '',
        company: '',
    };

    // useSate για το game που γίνεται update
    const [currentGame, setCurrentGame] = useState(initialGameState);

    //useState για τον πίνακα
    const [games, setGames] = useState({data: ''});

    const [error, setError] = useState({
        message: '',
        show: false
    });

    const getGames = async () => {
        try {
            let res = await getGamesApi();
            setGames((prevState) => ({
                ...prevState,
                data: res.data.rows
            }))
        } catch (error) {
            setError(prevState => ({
                ...prevState,
                message: `Υπάρχει πρόβλημα επικοινωνήστε με τον διαχειριστή του συστήματος`,
                show: true,
            }))
        }
    };

    // useState για το edit εγγραφής του πίνακα

    const [editing, setEditing] = useState(false);

    const addGame = async (game) => {
        try {
            let res = await putGameApi(game);
            game.id = res.data.rows.id;
            setGames((prevState) => {
                const data = [...prevState.data];
                data.push(game);
                return {
                    ...prevState,
                    data
                }
            })
        } catch (error) {
            setError(prevState => ({
                ...prevState,
                message: `Η εισαγωγή δεν έγινε επικοινωνήστε με τον διαχειριστή του συστήματος`,
                show: true,
            }))
        }
    };

    const updateGame = async (game) => {
        setEditing(true);
        setCurrentGame(game);
    };

    const saveUpdateGame = async (oldGame, game) => {
        try {
            setEditing(false);
            await updateGameApi(oldGame, game);
            setGames((prevState) => {
                const data = [...prevState.data];
                data[data.indexOf(oldGame)] = game;
                return {
                    ...prevState,
                    data
                }
            })
        } catch (error) {
            setError(prevState => ({
                ...prevState,
                message: `Η επεξεργασία δεν έγινε επικοινωνήστε με τον διαχειριστή του συστήματος`,
                show: true,
            }))
        }
    };

    const deleteGame = async (game) => {
        try {
            await deleteGameApi(game);
            setGames((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(game), 1);
                return {
                    ...prevState,
                    data
                }
            })
        } catch (error) {
            setError(prevState => ({
                ...prevState,
                message: `Η διαγραφή δεν έγινε επικοινωνήστε με τον διαχειριστή του συστήματος`,
                show: true,
            }))
        }
    };

    useEffect(() => {
        getGames();
    }, []);

    return (
        <Container>
            {error.show && <ErrorMessage message={error.message} setError={setError}/>}
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Paper>
                            {editing ? (
                                <EditGameForm gameForUpdate={currentGame} saveUpdateGame={saveUpdateGame}
                                              setEditing={setEditing}/>
                            ) : (
                                <AddGameForm addGame={addGame}/>
                            )}

                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                            <h3>Πίνακας παιχνιδιών</h3>
                            <CustomTable games={games.data} deleteGame={deleteGame} updateGame={updateGame}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}

