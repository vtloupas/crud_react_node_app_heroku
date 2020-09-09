import React, {useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import {deleteGameApi, getGamesApi, putGameApi, updateGameApi} from "./QueriesFunctions";
import ErrorMessage from "./ErrorMessage";
import {Container} from "@material-ui/core";

export default function Table() {
    const columns = [
        {title: 'id', field: 'id', hidden: true},
        {title: 'Τίτλος', field: 'title'},
        {title: 'Εταιρεία', field: 'company'},
    ];

    const [tableData, setTableData] = React.useState({
        data: [],
    });

    const [error, setError] = useState({
        message: '',
        show: false
    });

    const getGames = async () => {
        try {
            let res = await getGamesApi();
            setTableData(prevState => ({
                ...prevState,
                data: res.data.rows
            }));
        } catch (error) {
            setError(prevState => ({
                ...prevState,
                message: `Υπάρχει πρόβλημα επικοινωνήστε με τον διαχειριστή του συστήματος`,
                show: true,
            }))
        }
    };

    const putGame = async (newData) => {
        try {
            let res = await putGameApi(newData);
            setTableData((prevState) => {
                const data = [...prevState.data];
                data.push(res.data.rows);
                return {...prevState, data};
            });
        } catch (error) {
            setError(prevState => ({
                ...prevState,
                message: `Η εισαγωγή δεν έγινε επικοινωνήστε με τον διαχειριστή του συστήματος`,
                show: true,
            }))
        }

    };

    const updateGame = async (newData, oldData) => {
        try {
            await updateGameApi(oldData, newData);
            if (oldData) {
                setTableData((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return {...prevState, data};
                });
            }
        } catch (error) {
            setError(prevState => ({
                ...prevState,
                message: `Η επεξεργασία δεν έγινε επικοινωνήστε με τον διαχειριστή του συστήματος`,
                show: true,
            }))
        }
    };

    const deleteGame = async (oldData) => {
        try {
            await deleteGameApi(oldData);
            setTableData((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return {...prevState, data};
            });
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
            <MaterialTable
                title="Πίνακας παιχνιδιών"
                columns={columns}
                options={{
                    headerStyle: {
                        fontWeight: 'bold'
                    },
                    rowStyle: {
                        backgroundColor: '#EEE',
                    }
                }}
                localization={{
                    header: {
                        actions: ''
                    },
                }}
                data={tableData.data}
                editable={{
                    onRowAdd: async (newData) => {
                        await putGame(newData);
                    },
                    onRowUpdate: async (newData, oldData) => {
                        await updateGame(newData, oldData);
                    },
                    onRowDelete: async (oldData) => {
                        await deleteGame(oldData);
                    },
                }}
            />
        </Container>
    );
}

