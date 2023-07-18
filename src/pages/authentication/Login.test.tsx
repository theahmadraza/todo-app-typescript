import { render , screen, fireEvent, act} from '@testing-library/react';
import Login from './login';

jest.mock('react-router-dom', ()=> ({
    ...jest.requireActual('react-router-dom'),
    useNavigate:jest.fn(),
})
);

// describe("Render Login Page", ()=>{
//     it('should render Login', () => {
//         render(
//          <Login />
//        );
//        const linkElement = screen.getByRole("heading" , {name:"Login here!"});
//        expect(linkElement).toBeInTheDocument();
//     });
// })

describe("Render Login Page", ()=>{
    it('Should Render Login Form', () => {
        act(()=>{
            render(<Login />);
        })
        fireEvent.change(screen.getByLabelText('Email'), {target : {value : "test@example.com"}});
        fireEvent.change(screen.getByLabelText('Password'), {target : {value : "password123"}});
        fireEvent.click(screen.getByRole('button'), {name : 'Submit'});

        expect(screen.queryAllByText('Login').length).toBeGreaterThan(0);
    });
})