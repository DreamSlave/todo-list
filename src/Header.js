import HeaderStyles from './assets/Header.module.css'

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