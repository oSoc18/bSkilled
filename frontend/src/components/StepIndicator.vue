<template>
  <nav class="">
    <ul class="progressbar">
      <li class="progressbar_item current"><a class="progressbar_item_link" href="#">Search for your skill</a></li></li>
      <li class="progressbar_item"><a class="progressbar_item_link link--disabled" href="#">Some personal information</a></li>
      <li class="progressbar_item"><a class="progressbar_item_link link--disabled" href="#">Save your badge</a></li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@import "~Vars";

.progressbar {
  position: fixed;
  width: 150px;
  counter-reset: step;
  padding-left: 30px;

  &::before {
    display: inline-block;
    content: '';
    position: absolute;
    left: 17px;
    height: 90%;
    width: 3px;
    background: #DEDFE6;
  }

  &_item {
    padding-left: 35px;
    position: relative;
    counter-increment: list;

    &:not(:last-child) {
      padding-bottom: 90px;
    }

    &_link {
      font-size: 13px;
      color: #DEDFE6;
      font-weight: 700;
      &::after {
        content: counter(step);
        counter-increment: step;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: -30px;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: #DEDFE6;
        color: white;
        font-size: 10px;
      }
    }
  }
}

.visited {
  &::before {
    content: '';
    position: absolute;
    left: -13px;
    height: 100%;
    width: 3px;
    background: #F99D23;
  }

  & a::after {
    background-color: #F99D23;
  }

}

.current {
  &::before {
    content: '';
    position: absolute;
    left: -13px;
    height: 55%;
    width: 3px;
    background: #F99D23;
  }

  & a {
    color: #30355C;

    &::after {
      background-color: #F99D23;
      border: 4px solid #fff;
      box-shadow: 0 0 0 3px #F99D23;
    }
  }
}

.link--disabled {
  pointer-events: none;
}
</style>
