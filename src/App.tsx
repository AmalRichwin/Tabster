import './styles.css';
import IMAGE from './react.png';
import BEAKER from './beaker.svg';
import ClickCounter from './ClickCounter';

export default function App() {
    const num = 0;
    return (
        <div>
            <h1>Custom Webpack - React</h1>
            <img src={IMAGE} alt='react logo' width={150} height={150} />
            <img src={BEAKER} alt='beaker' width={150} height={150} />
            <ClickCounter />
        </div>
    );
}
