import { Request, Response, NextFunction, RequestHandler } from 'express';
import { body, validationResult } from 'express-validator';
import { emailRegex } from '../utils/emailValidation';


// validation results
export const validate = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};

// Validator for user registration
export const userRegistrationValidator = (    
    name: string,
    email: string,
    password: string) => {
    if (!name || !email || !password) {
        return "please fill all the fields"        
    }
    if (password.length < 6) {
       return "password must contain 6 charactors"
        
    }
    if (!email.match(emailRegex)) {
        return "Enter a valid email" 
        
    }
    return null
}
// Validator for user login
export const userLoginValidator = ( 
    
    email: string,
    password: string) => {
    if (!email || !password) {
        return "please fill all the fields"        
    }
    if (password.length < 6) {
       return "password must contain 6 charactors"
        
    }
    if (!email.match(emailRegex)) {
        return "Enter a valid email" 
        
    }
    return null
}
