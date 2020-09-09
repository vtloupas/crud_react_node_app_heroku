import React, {useEffect, useState} from "react";
import {Button, Container, FormControl, FormGroup, Input, InputLabel} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

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

const EditGameForm = (props) => {

    const classes = useStyles();

    const [formGame, setFormGame] = useState(props.gameForUpdate);

    useEffect(() => {
        setFormGame(props.gameForUpdate)
    }, [props]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormGame(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleOnSubmitGame = async (event) => {
        event.preventDefault();
        if (!formGame.title || !formGame.company) return;
        props.saveUpdateGame(props.gameForUpdate, formGame)
    };

    return (
        <Container>
            <h3>Επεξεργασία νέου παιχνιδιού</h3>
            <form onSubmit={handleOnSubmitGame} className={classes.root}>
                <FormGroup>
                    <FormControl className={classes.textInput}>
                        <InputLabel htmlFor="title">Τίτλος</InputLabel>
                        <Input id="title" type="text" name="title" value={formGame.title} onChange={handleInputChange}/>
                    </FormControl>
                    <FormControl className={classes.textInput}>
                        <InputLabel htmlFor="company">Εταιρεία</InputLabel>
                        <Input id="company" type="text" name="company" value={formGame.company}
                               onChange={handleInputChange}/>
                    </FormControl>
                    <formControl className={classes.button}>
                        <Button type="submit" value="submit" variant="contained" color="primary">ΑΠΟΘΗΚΕΥΣΗ
                            ΠΑΙΧΝΙΔΙΟΥ</Button>
                        <Button onClick={() => (props.setEditing(false))} variant="contained"
                                color="secondary">Ακυρωση</Button>
                    </formControl>
                </FormGroup>
            </form>
        </Container>
    )
};

export default EditGameForm