import React from 'react';
import {NavLink} from "react-router-dom";

const Footer = () => {
  return (
    <div className='footer_wrapper'>
      <div className="container">
        <div className="footer">
          <div className="footer_btn">
            <NavLink to='/' className='footer_btn__link'>
              <button>
                Расходники
              </button>
            </NavLink>
          </div>
          <div className="footer_btn">
            <NavLink to='/solute' className='footer_btn__link'>
              <button>
                Растворы
              </button>
            </NavLink>
          </div>
          <div className="footer_btn">
            <NavLink to='/completeProducts' className='footer_btn__link'>
              <button>
                Готовая продукция
              </button>
            </NavLink>
          </div>

          <div className="footer_btn">
            <NavLink to='/archive' className='footer_btn__link'>
              <button>
                Архив
              </button>
            </NavLink>
          </div>

          <div className="footer_btn">
            <NavLink to='#' className='footer_btn__link'>
              <button>
                Анализ
              </button>
            </NavLink>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Footer;