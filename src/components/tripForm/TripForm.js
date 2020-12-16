import React from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
// import { useHistory, withRouter } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import * as Yup from 'yup';
import TripCostSummaryFields from './TripCostSummaryFields'

import makeStyles from '@material-ui/core/styles/makeStyles';

import FormikField from './FormikField'
// import FormikSelect from './form/FormikSelect'
import TransportTypeField from './TransportTypeField'
// import FormikDatesField from './form/FormikDatesField'
import TransportCostField from './TransportCostField'
import ExtraExpensesCostField from './ExtraExpensesCostField'
import ExtraExpensesField from './ExtraExpensesField'

import {saveTrip} from '../../store/actions/trips'




const headerMinHeight = 70;

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: headerMinHeight,
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
    title: {},
    costField: {
        width: '100px'
    },
    summaryField: {
        width: '150px'
    }
}))


function TripForm({selectedTrip, tripLength, tripCost, saveTrip}) {

    
    const classes = useStyles();
    
    const onSubmit = (values) => {
        console.log('Form submitted');
        // console.log('Form submitted', values, tripLength, tripCost)
        saveTrip(values, tripLength, tripCost)
    }

    const validationSchema = Yup.object({});

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
                            initialValues={selectedTrip}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            <Form autoComplete="off">
                                <Grid container spacing={3} direction="column">

                                    {/* <Grid item>
                                        <FormikField name="totalCost" label="Total cost"/>
                                    </Grid> */}
                                   
                                    

                                    <Grid item>
                                        <FormikField
                                            name="destination"
                                            label="Destination"
                                            helperText="(Country, City)"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <FormikField name="dates.start" helperText="Start trip" type="date"/>
                                        <FormikField name="dates.end" helperText="End trip" type="date"/>
                                    </Grid>
                                    <Grid item>
                                        <FormikField
                                            name="housing.type"
                                            label="Housing type"
                                            helperText="Hotel, Apartments, etc."
                                        />
                                        <FormikField
                                            name="housing.cost"
                                            label="$"
                                            helperText="Per day"
                                            className={classes.costField}
                                        />
                                    </Grid>

                                    <Grid item>
                                        <FormikField
                                            name="meals.type"
                                            label="Meal type"
                                            helperText="Included / Not included"
                                        />

                                        <FormikField
                                            name="meals.cost"
                                            label="$ / day"
                                            className={classes.costField}
                                        />

                                    </Grid>
                                    <Grid item container direction="row">
                                        <TransportTypeField
                                            name="transportation.type"
                                            label="Transport"
                                            type="type"
                                        />
                                        <TransportCostField
                                            name="transportation.cost"
                                            label="$"
                                            className={classes.costField}
                                        />
                                    </Grid>
                                    <Grid item container direction="row">
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
                                    <Grid item>
                                        <TripCostSummaryFields className={classes.summaryField}/>
                                    </Grid>

                                </Grid>


                                <Grid
                                    container
                                    spacing={1}
                                    style={{marginTop: "15px"}}
                                >
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                    >Delete
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<SaveIcon />}
                                    >Save
                                    </Button>
                                </Grid>
                            </Form>
                        </Formik>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

function mapStateToProps({trips: {selectedTrip}, tripsForm: {tripLength, tripCost}}) {

    console.log(tripCost);

    return {selectedTrip, tripLength, tripCost}
}

const mapDispatchToProps = {
    saveTrip
}

export default connect(mapStateToProps, mapDispatchToProps)(TripForm)
