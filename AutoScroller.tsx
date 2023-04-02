import Image from '@base/Image';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Slider = styled.div`
  height: ${Spacings.SPACING_4B};
  position: relative;
  overflow: hidden;
  scroll-behavior: smooth;
`;

const SlideTrack = styled.div`
  position: relative;
`;

const IconWrapper = styled.div`
  width: ${Spacings.SPACING_4B};
  height: ${Spacings.SPACING_4B};
  position: relative;
`;
const Slide = styled(Typography)`
  display: flex;
  flex-direction: row;
  gap: ${Spacings.SPACING_6};
  color: var(--color-base-fill);
`;

const AutoScroller = ({ socialProofingData }) => {
  const sliderData = [
    {
      icon: 'referrals/wonRewards.svg',
      title: `${numberFormatter(
        socialProofingData[0].totalRewardWinners
      )} learners won rewards till now`
    },
    {
      icon: 'referrals/winRewardAmount.svg',
      title: `Rewards worth ₹${numberFormatter(
        socialProofingData[1].totalVoucherReward
      )} won so far`
    }
  ];

  useEffect(() => {
    let marginIndex = defaultMarginIndex;
    const layoutHeader = document.getElementById('slide-track');
    const slides = document.querySelectorAll('.slide');
    const firstClone = slides[0].cloneNode(true);
    layoutHeader.append(firstClone);
    const sliderLength = sliderData.length;
    const timer = setInterval(() => {
      const layoutHeader = document.getElementById('slide-track');
      layoutHeader.style.transition = '.7s';
      if (marginIndex <= -(defaultMarginIndex * sliderLength)) {
        layoutHeader.style.transition = 'none';
        marginIndex = defaultMarginIndex;
      }
      marginIndex -= defaultMarginIndex;
      if (layoutHeader) {
        layoutHeader.style.marginTop = `${marginIndex}px`;
      }
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, [sliderData.length]);

  return (
    <Slider className="slider">
      <SlideTrack id="slide-track" className="slide-track">
        {sliderData.map((item) => {
          return (
            <Slide key={item.icon} className="slide" variant="p3">
              <IconWrapper>
                <Image src={item.icon} alt="Referral Icons" layout="fill" />
              </IconWrapper>
              {item.title}
            </Slide>
          );
        })}
      </SlideTrack>
    </Slider>
  );
};

export default AutoScroller;
