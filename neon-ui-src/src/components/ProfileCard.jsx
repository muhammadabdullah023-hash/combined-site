function ProfileCard({ name, role, image, github, theme }) {
  return (
    <div className={`profile-card ${theme}`}>
      <div className="profile-image-wrapper">
        <img src={image} alt={name} className="profile-image" />
      </div>
      <div className="profile-info">
        <p className="profile-label">PROFILE</p>
        <h3>{name}</h3>
        <p className="profile-role">{role}</p>
        <a href={github} target="_blank" rel="noopener noreferrer" className="github-link">
          <span>↗</span> View my GitHub
        </a>
      </div>
    </div>
  );
}

export default ProfileCard;
