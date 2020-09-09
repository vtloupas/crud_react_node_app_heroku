import React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function CustomTable(props) {

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Κωδικός</StyledTableCell>
                        <StyledTableCell>Τίτλος</StyledTableCell>
                        <StyledTableCell>Εταιρεία</StyledTableCell>
                        <StyledTableCell> </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.games.length > 0 ? (
                        props.games.map((game) => (
                            <StyledTableRow key={game.id}>
                                <StyledTableCell align="left">{game.id}</StyledTableCell>
                                <StyledTableCell align="left">{game.title}</StyledTableCell>
                                <StyledTableCell align="left">{game.company}</StyledTableCell>
                                <StyledTableCell align="left">
                                    <IconButton aria-label="edit"
                                                variant="contained"
                                                color="primary"
                                                className={classes.button}
                                                onClick={() => props.updateGame(game)}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton aria-label="delete"
                                                variant="contained"
                                                color="secondary"
                                                className={classes.button}
                                                onClick={() => props.deleteGame(game)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>Δεν υπάρχουν παιχνίδια</td>
                        </tr>
                    )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}