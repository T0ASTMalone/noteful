import React from 'react';

function NoteNav(props) {
        return (
            <>
                <button onClick={() => props.history.goBack()}>Go Back</button>
            </>
        )
}

export default NoteNav