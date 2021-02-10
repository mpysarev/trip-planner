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
import FormikField from './FormikField';
import makeStyles from '@material-ui/core/styles/makeStyles';

import * as yup from 'yup';

import TripCostSummaryFields from './TripCostSummaryFields'
import TransportTypeField from './TransportTypeField'
import TransportCostField from './TransportCostField'
import ExtraExpensesCostField from './ExtraExpensesCostField'
import ExtraExpensesField from './ExtraExpensesField'

import {saveTrip, deleteTrip} from '../../store/actions/trips'


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    paper: {
        width: '100%',
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column'
    },
    fieldsContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    content: {
        padding: '40px 200px'
    },
    costField: {
        width: '200px',
        marginBottom: 10
    },
    field: {
        width: '350px',
        marginBottom: 10
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
                   }) {
    
    const classes = useStyles();
    const history = useHistory();

    const onSubmit = (values) => {

        const userId = localStorage.getItem('userId');
        
        saveTrip(values, tripLength, tripCost, userId);
                
        history.push('/trips')
    }

    const onDelete = () => {
        const userId = localStorage.getItem('userId');

        deleteTrip(trip.id, userId);
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
                                return (
                                    <Form autoComplete="off" className={classes.form}>
                                        
                                        <Grid container spacing={2} direction="column" className={classes.content}>
            
                                            <Grid item xs={12}>
                                                <FormikField
                                                    name="destination"
                                                    label="Destination *"
                                                    helperText="(Country, City)"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} className={classes.fieldsContainer}>
                                                <FormikField
                                                    name="dates.start" 
                                                    helperText="Start trip *" 
                                                    type="date"
                                                    className={classes.field}
                                                />
                                                <FormikField 
                                                    name="dates.end" 
                                                    helperText="End trip *" 
                                                    type="date"
                                                    className={classes.field}
                                                />
                                            </Grid>
                                            <Grid item xs={12} className={classes.fieldsContainer}>
                                                <FormikField
                                                    name="housing.type"
                                                    label="Housing type *"
                                                    helperText="Hotel, Apartments, etc."
                                                    className={classes.field}
                                                />
                                                <FormikField
                                                    name="housing.cost"
                                                    label="$ / day *"
                                                    helperText="Number"
                                                    className={classes.costField}
                                                />
                                            </Grid>
        
                                            <Grid item container direction="row" xs={12} className={classes.fieldsContainer}>
                                                <TransportTypeField
                                                    name="transportation.type"
                                                    label="Transport *"
                                                    type="type"
                                                    className={classes.field}
                                                />
                                                <TransportCostField
                                                    name="transportation.cost"
                                                    label="$ *"
                                                    className={classes.costField}
                                                />
                                            </Grid>
                                            <Grid item xs={12} className={classes.fieldsContainer}>
                                                <FormikField
                                                    name="meals.type"
                                                    label="Meal type"
                                                    helperText="Included / Not included"
                                                    className={classes.field}
                                                />
        
                                                <FormikField
                                                    name="meals.cost"
                                                    label="$ / day"
                                                    helperText="Number"
                                                    className={classes.costField}
                                                />
        
                                            </Grid>
                                            <Grid item container direction="row" xs={12} className={classes.fieldsContainer}>
                                                <ExtraExpensesField
                                                    name="extraExpenses.type"
                                                    label="Extra expenses"
                                                    type="type"
                                                    className={classes.field}
                                                />
                                                <ExtraExpensesCostField
                                                    name="extraExpenses.cost"
                                                    label="$"
                                                    type="price"
                                                    className={classes.costField}
                                                />
                                            </Grid>
                                            <Grid item xs={5}>
                                                <TripCostSummaryFields className={classes.summaryField}/>
                                            </Grid>
                                    </Grid>    
    
                                    <Grid
                                        container
                                        spacing={0}
                                        style={{padding: "0 200px"}}
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
