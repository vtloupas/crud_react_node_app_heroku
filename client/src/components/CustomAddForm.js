import React, {useState} from "react";
import {Button, Container, FormControl, FormGroup, Input, InputLabel} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    textInput: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    button: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const AddGameForm = (props) => {

    const classes = useStyles();

    const initialFormState = {id: null, title: '', company: ''};
    const [game, setGame] = useState(initialFormState);

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setGame(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleOnSubmitGame = async (event) => {
        event.preventDefault();
        if (!game.title || !game.company) return;
        props.addGame(game);
        setGame(initialFormState)
    };

    return (
        <Container>
            <h3>Εισαγωγή παιχνιδιού</h3>
            <form className={classes.root} onSubmit={handleOnSubmitGame}>
                <FormGroup>
                    <FormControl className={classes.textInput}>
                        <InputLabel htmlFor="title">Τίτλος</InputLabel>
                        <Input id="title" type="text" name="title" value={game.title} onChange={handleInputChange}/>
                    </FormControl>
                    <FormControl className={classes.textInput}>
                        <InputLabel htmlFor="company">Εταιρεία</InputLabel>
                        <Input id="company" type="text" name="company" value={game.company}
                               onChange={handleInputChange}/>
                    </FormControl>
                    <FormControl className={classes.button}>
                        <Button variant="outlined" color="primary" value="Submit" type="submit">ΠΡΟΣΘΗΚΗ
                            ΠΑΙΧΝΙΔΙΟΥ</Button>
                    </FormControl>
                </FormGroup>
            </form>
        </Container>
    )
};

export default AddGameForm