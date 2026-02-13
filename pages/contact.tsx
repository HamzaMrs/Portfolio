import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Layout, { PageWrapper } from '../components/Layout';
import emailjs from '@emailjs/browser';
import { getTransitions } from '../components/Utils';

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorObj, setErrorObj] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('hamza31mars@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <motion.div {...getTransitions(0.2)}>
            <h1 className="intro__text">Contact.</h1>
            <article>
              <p>
                Contactez-moi ou envoyez-moi un email directement sur{' '}
                <b
                  onClick={handleCopy}
                  className="email-link"
                  title="Cliquez pour copier"
                >
                  hamza31mars@gmail.com
                </b>
                {copied && <span className="copied-msg">Copié !</span>}
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
                    aria-label="Nom"
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
                    aria-label="Email"
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
                    aria-label="Message"
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
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: '1rem', color: '#34c759', fontWeight: 500 }}
                >
                  Merci ! Votre message a bien été envoyé.
                </motion.p>
              )}
              {errorObj && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginTop: '1rem', color: '#ff3b30', fontWeight: 500 }}
                >
                  {errorObj}
                </motion.p>
              )}
            </form>
          </motion.div>
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

  .email-link {
    cursor: pointer;
    transition: color 0.2s ease;
    position: relative;
    
    &:hover {
      color: var(--token);
      text-decoration: underline;
    }
  }

  .copied-msg {
    margin-left: 10px;
    font-size: 0.8em;
    color: #34c759;
    font-weight: bold;
  }

  input,
  textarea {
    background: var(--header-bg) !important;
    backdrop-filter: blur(12px);
    border: 1px solid var(--border-color) !important;
    border-radius: 10px;
    color: var(--cw) !important;
    margin-bottom: 2rem;
    box-shadow: none !important;
    resize: none;
    padding: 24px 21px !important;
    width: 100%;
    transition: all 0.2s ease;

    &:focus {
      background-color: var(--bg) !important;
      border-color: var(--cw) !important;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12) !important;
      transform: translateY(-2px);
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
