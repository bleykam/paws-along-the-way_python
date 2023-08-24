import './ContactInfo.scss';

export default function ContactInfo(){
    const userJSON = localStorage.getItem('user');
    const user = JSON.parse(userJSON);

    return(
        <section className="contact-info">
        <label className="contact-info__label" htmlFor="organization">Organization:{" "}</label>
        <div id="organization" name="organization">{user.organization}</div>

        <label className="contact-info__label" htmlFor="user-name">Name:{" "}</label>
        <div id="user-name">{user.first_name} {user.last_name}</div>

        <label className="contact-info__label" htmlFor="email">
          Email:{" "}
        </label>
        <div id="email" name="email">
          {user.email}
        </div>
        <label className="contact-info__label" htmlFor="phone">
          Phone:{" "}
        </label>
        <div id="phone" name="phone">
          {user.phone}
        </div>
        <label className="contact-info__label" htmlFor="address">
          Address:{" "}
        </label>
        <div id="address" name="address">
          {user.address}
        </div>
      </section>
    )
}