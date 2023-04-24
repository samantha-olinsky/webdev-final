import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { findFollowsByFollowedId, findFollowsByFollowerId} from "../following/follows-service";
import {Link} from "react-router-dom";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [likes, setLikes] = useState([]);
  const [following, setFollowing] = useState([]);
  const [follows, setFollows] = useState([]);

  const fetchFollowing = async () => {
    const following = await findFollowsByFollowerId(user._id);
    setFollowing(following);
  };
  const fetchFollowers = async () => {
    const follows = await findFollowsByFollowedId(user._id);
    setFollows(follows);
  };
  const loadScreen = async () => {
    // await fetchLikes();
    await fetchFollowing();
    await fetchFollowers();
  };
  // useEffect(() => {
  //   const asyncFn = async () => {
  //     const { payload } = await dispatch(profileThunk());
  //     setProfile(payload);
  //   };
  //   asyncFn();
  // }, [dispatch]);
  useEffect(() => {
    loadScreen();
  }, [user]);

  return (
    <div className="mt-3 mb-4">
      {!user &&

        <div className="card text-white bg-secondary mb-3 mt-3">
          <div className="card-header row">
            <div className="col">
              <h4>Welcome, Beings from Earth and Beyond!</h4></div>
            <div className="col">
              <button type="button" className="btn-close float-end" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                navigate(`/`);
              }}>
                <span aria-hidden="true"></span>
              </button>
            </div>
          </div>

          <div className="card-body row">
            <div className="col-6">
              <h4 className="card-title">Invalid Login credentials.</h4>

              <button className="btn btn-info btn-lg mt-2" onClick={() => {navigate('/login')}}>Try Again</button>
            </div>

          </div>
        </div>}
      {user && <div className="row w-100 mx-0 px-0">
        <div className="col-12 position-relative px-0">
          <img className="w-100 rounded" alt="" src={`images/${user.type}_banner.png`}/>
          <img className="h-75 position-absolute rounded start-0 bottom-0" alt="" src={`images/${user.type}_pfp.jpg`}/>
        </div>
        <div className="row my-2">
          <div className="col-4 pt-2 mt-2">
            <h1 className="fw-bold">{user.display_name}</h1>
            <h4 className="text-secondary">@{user.username}</h4>
            <h6><span className="fw-bold me-2">{follows.length}</span> Followers</h6>
            <h6><span className="fw-bold me-2">{following.length}</span> Following</h6>
          </div>
          <div className="col-3 position-relative">
            <div className="position-absolute bottom-0 start-0">
              <div className={user.location === "" ? "d-none" : 'd-flex align-items-start'}>
                <i className="fa fa-solid fa-location-dot me-3"/><h6>{user.location}</h6>
              </div>
              <div className={user.email === "" ? "d-none" : 'd-flex align-items-start'}>
                <i className="fa fa-solid fa-envelope me-3"/><h6>{user.email}</h6>
              </div>
              <div className={user.phone === "" ? "d-none" : 'd-flex align-items-start'}>
                <i className="fa fa-solid fa-phone me-3"/><h6>{user.phone}</h6>
              </div>
            </div>
          </div>
          <div className="col-3 position-relative">
            <div className="position-absolute bottom-0 start-0">
              <h6 className={user.type === 'MODERATOR' ? '' : 'd-none'}><span className="fw-bold me-2">{user.actions_taken}</span> Actions Taken</h6>
              <h6 className={user.type === 'ALIEN' ? '' : 'd-none'}><span className="fw-bold me-2">{user.total_likes}</span> Likes</h6>
              <h6 className={user.type === 'HUMAN' ? '' : 'd-none'}><span className="fw-bold me-2">{user.total_recs}</span> Recommendations</h6>
              <h6><span className="fw-bold me-2">{user.total_comments}</span> Comments</h6>
            </div>
          </div>
          <div className="col-2 position-relative">
            <Link to="/edit-profile/">
              <button className="w-100 rounded-pill btn btn-light fw-bold position-absolute top-50 end-0">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
        <div className="row my-3 mx-0">
          <div className="col-8 card bg-secondary">
            <div className="card-body">
              <h4 className="card-title">Bio</h4>
              <p className="card-text">{user.bio}</p>
            </div>
          </div>
          <div className="col-4 card bg-primary">
            <div className="card-body">
              <h4 className="card-title">Wants to visit</h4>
              <p className="card-text">{user.wants_visit}</p>
            </div>
          </div>
        </div>
        {follows && (
            <div>
              <h2>Followers</h2>
              <ul className="list-group">
                {follows.map((follow) => (
                    <li className="list-group-item" key={follow.follower._id}>
                      <button className="h3 btn btn-link" onClick={() => {navigate(`/profile/${follow.follower.username}`)
                                                             window.location.reload()}}>
                        <h3>{follow.follower.username}</h3>
                      </button>
                    </li>
                ))}
              </ul>
            </div>
        )}
      {following && (
          <div>
            <h2>Following</h2>
            <ul className="list-group">
              {following.map((follow) => (
                  <li className="list-group-item" key={follow.followed._id}>
                    <button className="h3 btn btn-link" onClick={() => {navigate(`/profile/${follow.followed.username}`)
                                                           window.location.reload()}}>
                      <h3>{follow.followed.username}</h3>
                    </button>
                  </li>
              ))}
            </ul>
          </div>
        )}
        <div className="row my-3 mx-0">
          <h2>Recent Activity</h2>

        </div>
      </div>}
    </div>
  );
}
export default Profile;
