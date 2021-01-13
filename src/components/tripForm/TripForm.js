import React from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import makeStyles from '@material-ui/core/styles/makeStyles';

import * as yup from 'yup';

import FormikField from './FormikField'
import TripCostSummaryFields from './TripCostSummaryFields'
import TransportTypeField from './TransportTypeField'
import TransportCostField from './TransportCostField'
import ExtraExpensesCostField from './ExtraExpensesCostField'
import ExtraExpensesField from './ExtraExpensesField'

import {saveTrip, deleteTrip} from '../../store/actions/trips'


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    paper: {
        width: '100%',
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fieldsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    costField: {
        width: '100px'
    },
    summaryField: {
        width: '150px'
    },
    button: {
        marginRight: 10
    }
}))


function TripForm({trip, 
                   tripLength, 
                   tripCost, 
                   saveTrip, 
                   deleteTrip,
                //    userId
                   }) {

    
    const classes = useStyles();
    const history = useHistory();

    // console.log('user Id', userId);

    
    const onSubmit = (values) => {
        // const userId = localStorage.getItem('userId');
        // const token = localStorage.getItem('token');
        // console.log(userId);
        // console.log(token);
        const userId = localStorage.getItem('userId');
        console.log('user Id', userId);

        console.log('Form submitted', tripLength, tripCost)
        saveTrip(values, tripLength, tripCost, userId);
        history.push('/trips')
    }

    const onDelete = () => {
        deleteTrip(trip.id);
        history.push('/trips')
    }

    const validationSchema = yup.object({
        destination: yup.string().required(),
        dates: yup.object().shape({
            start: yup.date().required(),
            end: yup.date().required(),
        }),
        housing: yup.object().shape({
            type: yup.string().required(),
            cost: yup.number().required(),
        }),
        transportation: yup.object().shape({
            type: yup.array().of(yup.string().required()),
            cost: yup.array().of(yup.number().required()),
        })
    });

    return (
        <Container className={classes.container}>
            <Grid container justify="center">
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography
                            className={classes.title}
                            component="h1"
                            variant="h4"
                            align="center"
                        >
                            My trip form
                        </Typography>
                        <Formik
                            enableReinitialize
                            initialValues={trip}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            validateOnMount
                        >
                            {formik => {
                                // console.log(formik.isValid);
                                return (
                                    <Form autoComplete="off">
                                    <Grid container spacing={3} direction="column">
        
                                        <Grid item xs={5}>
                                            <FormikField
                                                name="destination"
                                                label="Destination *"
                                                helperText="(Country, City)"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={5} className={classes.fieldsContainer}>
                                            <FormikField
                                                name="dates.start" 
                                                helperText="Start trip *" 
                                                type="date"
                                            />
                                            <FormikField 
                                                name="dates.end" 
                                                helperText="End trip *" 
                                                type="date"
                                            />
                                        </Grid>
                                        <Grid item xs={5} className={classes.fieldsContainer}>
                                            <FormikField
                                                name="housing.type"
                                                label="Housing type *"
                                                helperText="Hotel, Apartments, etc."
                                            />
                                            <FormikField
                                                name="housing.cost"
                                                label="$ / day *"
                                                helperText="Number"
                                                className={classes.costField}
                                            />
                                        </Grid>
    
                                        <Grid item container direction="row" xs={5} className={classes.fieldsContainer}>
                                            <TransportTypeField
                                                name="transportation.type"
                                                label="Transport *"
                                                type="type"
                                            />
                                            <TransportCostField
                                                name="transportation.cost"
                                                label="$ / day *"
                                                className={classes.costField}
                                            />
                                        </Grid>
                                        <Grid item xs={5} className={classes.fieldsContainer}>
                                            <FormikField
                                                name="meals.type"
                                                label="Meal type"
                                                helperText="Included / Not included"
                                            />
    
                                            <FormikField
                                                name="meals.cost"
                                                label="$ / day"
                                                helperText="Number"
                                                className={classes.costField}
                                            />
    
                                        </Grid>
                                        <Grid item container direction="row" xs={5} className={classes.fieldsContainer}>
                                            <ExtraExpensesField
                                                name="extraExpenses.type"
                                                label="Extra expenses"
                                                type="type"
                                            />
                                            <ExtraExpensesCostField
                                                name="extraExpenses.cost"
                                                label="$"
                                                type="price"
                                                className={classes.costField}
                                            />
                                        </Grid>
                                        <Grid item xs={5}>
                                            {/* <TripCostSummaryFields className={classes.summaryField}/> */}
                                        </Grid>
    
                                    </Grid>
    
                                    <Grid
                                        container
                                        spacing={0}
                                        style={{marginTop: "15px"}}
                                    >
                                        {trip.id ? <Button
                                            type="button"
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<DeleteIcon />}
                                            onClick={onDelete}
                                            className={classes.button}
                                        >Delete
                                        </Button> : null}
                                        <Button
                                            disabled={!formik.isValid}
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            startIcon={<SaveIcon />}
                                        >Save
                                        </Button>
                                    </Grid>
                                </Form>    
                                )
                            }}
                        </Formik>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

function mapStateToProps({trips: {list, emptyTrip}, 
                          tripSummary: {tripLength, tripCost}},
                          {match: {params}}) {

    let trip = list.find((item) => item.id === params.id)

    trip = trip || emptyTrip;

    return {trip, tripLength, tripCost}
}

const mapDispatchToProps = {
    saveTrip,
    deleteTrip
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(TripForm)
) 
