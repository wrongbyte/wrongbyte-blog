import { CodeBlock, rainbow, dracula } from 'react-code-blocks';
import { useTheme } from 'next-themes';

export const Code = (props: { className: string; children: string }) => {
    const { theme } = useTheme();

    if (!props.className) return <span className='code'>{props.children}</span>
    
    return (
        <div className='codeBlock'>
            <CodeBlock
            text={props.children}
            language={props.className.split('-')[1]}
            theme={theme === 'light' ? rainbow : dracula}
            />
        </div>
    )
}