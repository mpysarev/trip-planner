import React from 'react';
import { connect } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import {Formik, Form, ErrorMessage } from 'formik';
import {userAuth} from '../../store/actions/auth'

import FormikField from '../tripForm/FormikField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';



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
        maxWidth: 600,
        textAlign: 'center'
    },
    title: {},
    costField: {
        width: '100px'
    },
    summaryField: {
        width: '150px'
    }
}))

const initialValues = {
    email: '',
    password: ''
}



function Auth({userAuth, auth}) {

    const classes = useStyles();
    const history = useHistory()

    const onSubmit = (values, {resetForm}) => {
        userAuth(values, true);
        resetForm({email: '', password: ''});
        history.push('/trips')
    }

    const handleSignUp = ({values, resetForm}) => {
        userAuth(values);
        resetForm({email: '', password: ''});
        history.push('/trips')
    }

    const validationSchema = yup.object({
        email: yup.string().email('Please enter valid email').required('Email is required'),
        password: yup.string().required('Password required').min(6, 'Min 6 characters required')        
    });

    return (
        <Container className={classes.container}>
            <Grid container justify="center">
                <Paper className={classes.paper}>
                <Typography
                        className={classes.title}
                        component="h1"
                        variant="h4"
                        align="center"
                    >
                        Auth Form
                    </Typography>
                    <Formik
                        enableReinitialize
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                        initialValues={initialValues}
                        validateOnMount={true}
                    >
                        {formik => {
                            
                            return (
                                <Form autoComplete="off">
                                    <Grid container spacing={3} direction="column">
                                        <Grid item xs={12}>
                                            <FormikField 
                                                name="email"
                                                label="Email"
                                                fullWidth
                                                helperText={<ErrorMessage name="email"/>}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormikField 
                                                name="password"
                                                label="Password"
                                                fullWidth
                                                helperText={<ErrorMessage name="password"/>}
                                                type="password"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                type="button"
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleSignUp(formik)}
                                                disabled={!formik.isValid}
                                            >Create account
                                            </Button>
                                        </Grid>
                                        <Typography variant="button" display="block">OR</Typography>
                                        <Grid item>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                disabled={!formik.isValid}
                                            >Sign In
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )
                        }}
                    </Formik>
                </Paper>
            </Grid>
        </Container>
    )
}

function mapStateToProps({auth}) {
    return {auth};
}

const mapDispatchToProps = {
    userAuth
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Auth)
)
