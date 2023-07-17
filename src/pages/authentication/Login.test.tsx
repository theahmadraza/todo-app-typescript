import { render} from '@testing-library/react';
import Login from './login';

jest.mock('react-router-dom', ()=> ({
    ...jest.requireActual('react-router-dom'),
    useNavigate:jest.fn(),
})
);

describe("Render Login Page", ()=>{
    it('should render Login', () => {
        render(
         <Login />
       );
    });
})