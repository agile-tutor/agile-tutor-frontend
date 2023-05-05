//import React, { useState } from 'react';
//import M from 'materialize-css/dist/js/materialize.min.js';

const AlumnoModal = (/*{ addTech }*/) => {
  //  const [firstName, setFirstName] = useState('');
   // const [lastName, setLastName] = useState('');

 /*   const onSubmit = () => {
        if (firstName === '' || lastName === '') {
            M.toast({ html: 'Please Enter the First and Last Name' });
        } else {
            addTech({
                firstName,
                lastName,
            });

            M.toast({ html: `${firstName} ${lastName} was successfully added.` });
        }
    };
*/
    return (/*
        <div id='add-tech-modal' className='modal'>
            <div className='modal-content'>
                <h4>New Technician</h4>
                <div className='row'>
                    <div className='input-field'>
                        <input
                            type='text'
                            name='firstName'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label htmlFor='firstName' className='active'>
                            First Name
                        </label>
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field'>
                        <input
                            type='text'
                            name='lastName'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <label htmlFor='lastName' className='active'>
                            Last Name
                        </label>
                    </div>
                </div>
            </div>
            <div className='modal-footer'>
                <a
                    href='#!'
                    onClick={onSubmit}
                    className='modal-close waves-effect blue btn'
                >
                    Enter
                </a>
            </div>
        </div>*/
        <div id="modaledit" class="modal">
            <div class="modal-content">
                <h4>Modal Header</h4>
                <p>A bunch of text</p>
            </div>
            <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
            </div>
        </div>
    );
};

export default AlumnoModal;