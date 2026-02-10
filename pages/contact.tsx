import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Layout, { PageWrapper } from '../components/Layout';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorObj, setErrorObj] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorObj(null);

    if (form.current) {
      emailjs
        .sendForm(
          'service_18lx8ok',
          'template_1muwlsl',
          form.current,
          'wyfBy7vjKfXBFFm8y'
        )
        .then(
          (result) => {
            console.log(result.text);
            setSuccess(true);
            setLoading(false);
            form.current?.reset();
          },
          (error) => {
            console.log(error.text);
            setErrorObj(error.text || "Une erreur s'est produite. Veuillez réessayer.");
            setLoading(false);
          }
        );
    }
  };

  return (
    <Layout title="Contact">
      <StandardSection id="contact">
        <PageWrapper>
          <h1 className="intro__text">Contact.</h1>
          <article>
            <p>
              Contactez-moi ou envoyez-moi un email directement sur{' '}
              <b>hamza31mars@gmail.com</b>
            </p>
          </article>
          <br />
          <form ref={form} onSubmit={sendEmail}>
            <div className="fields">
              <div className="field half">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="Nom"
                  aria-required="true"
                  required
                />
              </div>
              <div className="field half">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  aria-required="true"
                  required
                />
              </div>
              <div className="field">
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  className="form-control"
                  placeholder="Message"
                  aria-required="true"
                  required
                />
              </div>
            </div>
            <button
              className="btn btn-default"
              type="submit"
              aria-label="Envoyer"
              disabled={loading}
            >
              {loading ? 'Envoi...' : 'Envoyer'}
            </button>
            {success && (
              <p style={{ marginTop: '1rem', color: '#34c759' }}>
                Merci ! Votre message a bien été envoyé.
              </p>
            )}
            {errorObj && (
              <p style={{ marginTop: '1rem', color: '#ff3b30' }}>
                {errorObj}
              </p>
            )}
          </form>
        </PageWrapper>
      </StandardSection>
    </Layout>
  );
};

const StandardSection = styled.div`
  min-height: 100vh;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .intro__text {
    font-size: 8rem;
    font-weight: 900;
    margin: 4rem 0rem 1.5rem;
    position: relative;
  }

  p {
    font-size: calc(var(--font-sm) + 0.9px);
    margin-top: 0.6rem;
    line-height: 2;
    font-weight: 400;
    color: var(--article-color) !important;
  }

  input,
  textarea {
    background: transparent;
    color: var(--cw) !important;
    margin-bottom: 2rem;
    box-shadow: none !important;
    resize: none;
    padding: 24px 21px !important;
    border-color: var(--border-color) !important;
    width: 100%;
    &:focus {
      background-color: var(--bg);
    }
  }

  button.btn {
    font-size: calc(var(--font-sm) + 1.1px);
    background: var(--cw);
    border: none;
    color: var(--bg);
    border-radius: 5px;
    padding: 15px 40px;
    margin-bottom: 3rem;
    cursor: pointer;
  }

  form {
    width: 60%;
  }

  @media (max-width: 989px) {
    form {
      width: 100% !important;
    }
  }
`;

export default Contact;
