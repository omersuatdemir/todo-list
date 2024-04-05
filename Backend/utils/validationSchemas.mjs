export const UserValidation = {
    email: {
        notEmpty: { 
            errorMessage: "E-Mail Must Not be Empty!",
        },
    },
    password: {
        isLength: {
            options: {
                min: 8,
                max: 24,
            },
            errorMessage: "Password Must be at Least 8 - 24 Characters!",
        },
        notEmpty: { 
            errorMessage: "Password Must Not be Empty!",
        },
        matches: {
            options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/,
            errorMessage: 'Password Must Contain at Least one uppercase letter, one lowercase letter, and one number!',
        },
    },
};

export const PasswordValidation = {
    password: {
        isLength: {
            options: {
                min: 8,
                max: 24,
            },
            errorMessage: "Password Must be at Least 8 - 24 Characters!",
        },
        notEmpty: { 
            errorMessage: "Password Must Not be Empty!",
        },
        matches: {
            options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/,
            errorMessage: 'Password Must Contain at Least one uppercase letter, one lowercase letter, and one number!',
        },
    },
};