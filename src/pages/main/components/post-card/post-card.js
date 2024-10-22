import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import styled from 'styled-components';

const PostCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	publishedAt,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className='post-card-footer'>
					<h4>{title}</h4>
					<div className='post-card-info'>
						<div className='published-at'>
							<Icon
								inactive={true}
								margin='0 7px 0 0'
								id='fa-calendar-o'
								size='18px'
							/>
							{publishedAt}
						</div>
						<div className='comments-count'>
							<Icon
								inactive={true}
								margin='0 7px 0 0'
								id='fa-comment-o'
								size='18px'
							/>
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	width: 280px;
	display: flex;
	flex-direction: column;
	margin: 20px;
	border: 1px solid #000;

	& .post-card-footer {
		border-top: 1px solid #000;
		padding: 5px;
	}

	& img {
		display: block;
		width: 100%;
	}

	& h4 {
		margin: 0;
	}
	& .post-card-info {
		display: flex;
		justify-content: space-between;
		margin-top: 5px;
	}
	& .published-at {
		display: flex;
	}
	& .comments-count {
		display: flex;
	}
`;