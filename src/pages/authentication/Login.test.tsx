import { render} from '@testing-library/react';
import Login from './login';

describe("Render Login Page", ()=>{
    it('should render Login', () => {
        render(<Login />);
    });
})