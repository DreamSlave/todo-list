import HeaderStyles from '../assets/css/Header.module.css'

function Header() {
    return (
        <div>
            <input
                className={HeaderStyles['no-border']}
                placeholder={'꿈을 입력해보세요.'}
            />
        </div>
    );
}

export default Header