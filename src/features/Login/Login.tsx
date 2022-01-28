import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import s from './../../App/App.module.css'
import {loginTC} from "./authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {Navigate} from "react-router-dom";
import {LoginParamsType} from "../../api/todolists-api";

export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            // const errors: FormikErrorType = {}
            const errors: Partial<Pick<LoginParamsType, 'email' | 'password' | 'rememberMe'>> = {}
            if (!values.email) {
                errors.email = 'Field is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Email address is invalid'
            }

            if (!values.password) {
                errors.password = 'Field is required'
            } else if (values.password.length <= 3) {
                errors.password = 'Password length should be more 3 symbols'
            }
            return errors
        },
        onSubmit: values => {
            formik.resetForm()
            console.log(values)
            dispatch(loginTC(values))
        }
    })

    if (isLoggedIn) {
        return <Navigate to="/"/>
    }


    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>

                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>

                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}/>

                        {formik.touched.email && formik.errors.email ?
                            <div className={s.errorSpan}>{formik.errors.email}</div> : null}

                        <TextField type="password"
                                   label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />

                        {formik.touched.password && formik.errors.password ?
                            <div className={s.errorSpan}>{formik.errors.password}</div> : null}

                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox  {...formik.getFieldProps('rememberMe')}/>}/>
                        <Button type={'submit'}
                                variant={'contained'}
                                color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>

                </FormControl>
            </form>
        </Grid>
    </Grid>
}